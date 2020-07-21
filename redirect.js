module.exports = function(RED) {

    "use strict";
    var mapeamentoNode;

    function RedirectNode(config) {
        RED.nodes.createNode(this, config);
        this.mapeamento = config.mapeamento
        this.channel_selector = config.channel_selector
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        var node = this
        
        node.on('input', function(msg, send, done) {
            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var slot = globalContext.get("slot");
            var command = {
                type: " mux_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                method: "redirect",
                channel_selector: parseInt(node.channel_selector),
                get_output: {},
                compare: {}
            }

            var file = globalContext.get("exportFile")
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    // file.begin.push(command);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    // file.end.push(command);
                }
            }
            globalContext.set("exportFile", file);
            // node.status({fill:"green", shape:"dot", text:"done"}); // seta o status pra waiting
            // msg.payload = command
            console.log(command)
            send(msg)
        });
    }
    RED.nodes.registerType("redirect", RedirectNode);

    // RED.httpAdmin.get("/getMapeamentoMux",function(req,res) {
    //     console.log(mapeamentoNode)
    //     if(mapeamentoNode){
    //         res.json([
    //             {value:mapeamentoNode.valuePort1, label:"A01/B01 - " + mapeamentoNode.labelPort1, hasValue:false},
    //             {value:mapeamentoNode.valuePort2, label: "A02/B02 - " + mapeamentoNode.labelPort2, hasValue:false},
    //             {value:mapeamentoNode.valuePort3, label: "A03/B03 - " + mapeamentoNode.labelPort3, hasValue:false},
    //             {value:mapeamentoNode.valuePort4, label: "A04/B04 - " + mapeamentoNode.labelPort4, hasValue:false},
    //             {value:mapeamentoNode.valuePort5, label: "A05/B05 - " + mapeamentoNode.labelPort5, hasValue:false},
    //             {value:mapeamentoNode.valuePort6, label: "A06/B06 - " + mapeamentoNode.labelPort6, hasValue:false},
    //             {value:mapeamentoNode.valuePort7, label: "A07/B07 - " + mapeamentoNode.labelPort7, hasValue:false},
    //             {value:mapeamentoNode.valuePort8, label: "A08/B08 - " + mapeamentoNode.labelPort8, hasValue:false},
    //             {value:mapeamentoNode.valuePort9, label: "A09/B09 - " + mapeamentoNode.labelPort9, hasValue:false},
    //             {value:mapeamentoNode.valuePort10, label: "A10/B10 - " + mapeamentoNode.labelPort10, hasValue:false},
    //             {value:mapeamentoNode.valuePort11, label: "A11/B11 - " + mapeamentoNode.labelPort11, hasValue:false},
    //             {value:mapeamentoNode.valuePort12, label: "A12/B12 - " + mapeamentoNode.labelPort12, hasValue:false},
    //             {value:mapeamentoNode.valuePort13, label: "A13/B13 - " + mapeamentoNode.labelPort13, hasValue:false},
    //             {value:mapeamentoNode.valuePort14, label: "A14/B14 - " + mapeamentoNode.labelPort14, hasValue:false},
    //             {value:mapeamentoNode.valuePort15, label: "A15/B15 - " + mapeamentoNode.labelPort15, hasValue:false},
    //             {value:mapeamentoNode.valuePort16, label: "A16/B16 - " + mapeamentoNode.labelPort16, hasValue:false},
    //         ])
    //     }
    //     else{
    //         res.json([
    //             {label:"A01/B01 - ", value: "0", hasValue:false},
    //             {label:"A02/B02 - ", value: "1", hasValue:false},
    //             {label:"A03/B03 - ", value: "2", hasValue:false},
    //             {label:"A04/B04 - ", value: "3", hasValue:false},
    //             {label:"A05/B05 - ", value: "4", hasValue:false},
    //             {label:"A06/B06 - ", value: "5", hasValue:false},
    //             {label:"A07/B07 - ", value: "6", hasValue:false},
    //             {label:"A08/B08 - ", value: "7", hasValue:false},
    //             {label:"A09/B09 - ", value: "8", hasValue:false},
    //             {label:"A10/B10 - ", value: "9", hasValue:false},
    //             {label:"A11/B11 - ", value: "10", hasValue:false},
    //             {label:"A12/B12 - ", value: "11", hasValue:false},
    //             {label:"A13/B13 - ", value: "12", hasValue:false},
    //             {label:"A14/B14 - ", value: "13", hasValue:false},
    //             {label:"A15/B15 - ", value: "14", hasValue:false},
    //             {label:"A16/B16 - ", value: "15", hasValue:false},
    //         ])
    //     }
    // });
}
