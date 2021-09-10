import fire from '../../../../../../config/fire-config'

export default async function DeleteNote(req, res) {
    if (req.method == 'DELETE') {
        try {
            await fire
                .firestore()
                .collection("users")
                .doc(req.query.userid)
                .collection("notes")
                .doc(req.query.id)
                .delete()
            
            res.json({ success : 'Note deleted successfully.' });
            return;
        } catch(e) {
            res.json({ error: e || 'Something went wrong!' })
            return;
        }
    }
    res.json({ error: 'Method Unavailable' });
}