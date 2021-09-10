import fire from '../../../../../../config/fire-config'

export default async function UpdateNote(req, res) {
    if (req.method == 'PATCH') {
        try {
            await fire
                .firestore()
                .collection("users")
                .doc(req.query.userid)
                .collection("notes")
                .doc(req.query.id)
                .update(req.body.update)
            
            res.json({ success : 'Note updated successfully.' });
            return;
        } catch(e) {
            res.json({ error: e || 'Something went wrong!' })
            return;
        }
    }
    res.json({ error: 'Method Unavailable' });
}