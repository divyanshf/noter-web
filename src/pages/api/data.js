import faker from "faker";

export default function getData(req, res) {
    const data = [];
    
    function getLabels(){
        const labels = [];
        for(let i=0; i<Math.ceil((Math.random()*2)+1); i++ ){
            labels.push(
                {
                    title:faker.random.word(),
                    key:i
                }
            );
        }
        return labels;
    }

    for (let i = 0; i < 20; i++) {
        var card = {
            id: i,
            title: faker.name.title(),
            content:faker.lorem.paragraphs(2),
            archive:Math.round(Math.random()),
            pinned:Math.round(Math.random()),
            labels:getLabels()
        };
        data.push(card);
    }
    res.json(data);
}
