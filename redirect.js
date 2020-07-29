module.exports = function(RED) {

    var mapeamentoNode;

    function multipleRedirect(self, file, slot, currentMode){
        for(var t=0; t<self.qtdRedirect; t++){
            var command_n={
                type: "mux_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                method: "redirect",
                channel_selector: parseInt(self.channel_selector_n[t]),
                get_output: {},
                compare: {}
            }
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command_n);
                }
                else{
                    file.slots[slot].jig_error.push(command_n);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command_n);
                }
                else{
                    file.slots[3].jig_test.push(command_n);
                }
            }
        }
        return file;
    }

    function RedirectNode(config) {
        RED.nodes.createNode(this, config);
        this.mapeamento = config.mapeamento;
        this.channel_selector = config.channel_selector;

        this.qtdRedirect = config.qtdRedirect;
        this.channel_selector_n = [];
        this.channel_selector_n.push(config.channel_selector1);
        this.channel_selector_n.push(config.channel_selector2);
        this.channel_selector_n.push(config.channel_selector3);
        this.channel_selector_n.push(config.channel_selector4);
        this.channel_selector_n.push(config.channel_selector5);
        this.channel_selector_n.push(config.channel_selector6);
        this.channel_selector_n.push(config.channel_selector7);
        this.channel_selector_n.push(config.channel_selector8);
        this.channel_selector_n.push(config.channel_selector9);
        this.channel_selector_n.push(config.channel_selector10);
        this.channel_selector_n.push(config.channel_selector11);
        this.channel_selector_n.push(config.channel_selector12);
        this.channel_selector_n.push(config.channel_selector13);
        this.channel_selector_n.push(config.channel_selector14);
        this.channel_selector_n.push(config.channel_selector15);
        this.channel_selector_n.push(config.channel_selector16);
        this.channel_selector_n.push(config.channel_selector17);
        this.channel_selector_n.push(config.channel_selector18);
        this.channel_selector_n.push(config.channel_selector19);
        this.channel_selector_n.push(config.channel_selector20);
        this.channel_selector_n.push(config.channel_selector21);
        this.channel_selector_n.push(config.channel_selector22);
        this.channel_selector_n.push(config.channel_selector23);
        this.channel_selector_n.push(config.channel_selector24);

        mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        var node = this;
        
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
            };

            var file = globalContext.get("exportFile");
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                    file = multipleRedirect(node, file, slot, currentMode);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                    file = multipleRedirect(node, file, slot, currentMode);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    file = multipleRedirect(node, file, slot, currentMode);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    file = multipleRedirect(node, file, slot, currentMode);
                }
            }
            globalContext.set("exportFile", file);
            console.log(command);
            send(msg);
        });
    }
    RED.nodes.registerType("redirect", RedirectNode);
};
