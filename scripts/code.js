function clickBtn() {

        changeCypher(document.getElementById("cypher").value);
}

function chyperchanged() {
    document.getElementById('Btn').disabled = false;
}

const setup = () => {
    document.getElementById("korps").addEventListener('change', changeKorps)
    document.getElementById("Btn").addEventListener("click", clickBtn)
    document.getElementById("cypher").addEventListener('change', chyperchanged)
    document.getElementById("cypher").value = initialCypher

    neoViz = new NeoVis.default(config);
    changeCypher(initialCypher);
    neoViz.render();
}

window.addEventListener("load", setup)

let initialCypher = "MATCH q=()<-[]-(r:Reservist)-[]->(p) " +
    "where (p:Project and p.name <> 'no project') or " +
    "(p:Competence and p.name <> 'no specific competence') " +
    "RETURN q"

let korpsstring = "";
let cypher = "";

function changeKorps(event) {
    korpsstring = event.target.value
    cypher = `MATCH q=(${korpsstring})<-[]-(r:Reservist)-[]->(p) 
    where (p:Project and p.name <> 'no project') 
    or (p:Competence and p.name <> 'no specific competence') RETURN q`
    changeCypher(cypher);
}

function changeCypher(cypher) {
        config.initialCypher = cypher;
        neoViz = new NeoVis.default(config);
        neoViz.render();
        document.getElementById("cypher").value = cypher;
        console.log("Executing : " + cypher);
}

let neoViz;
let config = {
    layout: {
        randomSeed: undefined,
        improvedLayout: true,
        clusterThreshold: 150,
        hierarchical: {
            enabled: false,
            levelSeparation: 150,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'hubsize',  // hubsize, directed
            shakeTowards: 'leaves'  // roots, leaves
        }
    },

    visConfig: {
        nodes: {
            shape: 'circle',
            borderWidth: 2,
            physics: true,
            font: '30px arial black',
            mass: 5
        },
        edges: {
            arrows: {
                to: {enabled: true}
            }
        },
    },
    containerId: "viz",

    neo4j: {
        serverUrl: "bolt://192.168.123.17:7687",
        serverUser: "neo4j",
        serverPassword: "neo4jpass",
    },
    arrows: true,
    labels: {
        "Korps": {
            label: "name",
            group: "community"
        },
        "Reservist": {
            caption: "name",
            label: "name",
            shape: 'box',
            group: "community"
        },
        "Project": {
            label: "name",
            shape: "text",
            group: "community"
        },
        "Competence": {
            label: "name",
            shape: "text",
            group: "community"
        }
    },
    relationships: {
        "Belongs_to": {
            label: "name"
        },
        "Works_on": {
            label: "name"
        },
        "Has_competence": {
            label: "name"
        }
    },

    initialCypher: initialCypher
};


