import fire from '../../../../../config/fire-config'

export default async function Star(req, res) {
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
            res.json({ notes: notes.filter(note => note.trash === false && note.archive === false && note.star === true) });
            return;
        } catch (e) {
            console.log(e);
            res.json({ error: e || 'Something went wrong!' })
            return;
        }
    }
    res.json({ error: 'Method Unavailable' });
}