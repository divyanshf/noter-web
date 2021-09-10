import fire from '../../../../../../../config/fire-config'


function checkNote(note, search) {
    if(search === "")
        return false;
    if (!note.archive && !note.trash){
        if (note.title.search(search) != -1 || note.content.search(search) != -1) {
            return true;
        }
    }
    return false;
}
  
export default async function index(req, res) {
    if (req.method == 'GET') {
        try {
            const snap = await fire
            .firestore()
            .collection("users")
            .doc(req.query.userid)
            .collection("notes")
            .orderBy("timestamp", "desc")
            .get()
            
            const notes = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.json({ notes : notes.filter(note => checkNote(note, req.query.search)) });
            return;
        } catch (e) {
            console.log(e);
            res.json({ error: e || 'Something went wrong!' })
            return;
        }
    }
    res.json({ error: 'Method Unavailable' });
}