import fire from '../../../../../config/fire-config'

export default async function AddNote(req, res) {
    if (req.method == 'POST') {
        try {
            await fire
                .firestore()
                .collection("users")
                .doc(req.query.userid)
                .collection("notes")
                .add({
                    title: req.body.title,
                    content: req.body.content,
                    trash: false,
                    archive: false,
                    star:false,
                    edited: false,
                    timestamp: fire.firestore.Timestamp.now()
                })
            
            res.json({ success : 'Note added successfully.' });
            return;
        } catch(e) {
            res.json({ error: e || 'Something went wrong!' })
            return;
        }
    }
    res.json({ error: 'Method Unavailable' });
}