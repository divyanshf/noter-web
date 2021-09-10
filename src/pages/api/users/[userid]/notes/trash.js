import fire from '../../../../../config/fire-config'

export default async function Trash(req, res) {
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
            console.log(notes);
            res.json({ notes: notes.filter(note => note.trash === true) });
            return;
        } catch (e) {
            console.log(e);
            res.json({ error: e || 'Something went wrong!' })
            return;
        }
    }
    res.json({ error: 'Method Unavailable' });
}