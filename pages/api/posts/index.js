
import data from '../data';

export default function handler(req, res) {
    const { Posts } = data;
    if (req.method == 'POST') {
        const body = JSON.parse(req.body)
        try {
            Posts.push(body)
            return res.status(200).json({ status: 'ok', message: "Successfull..." });
        } catch (error) {
            return res.status(401).json({ status: 'refuse', message: "Something went wrong!" });

        }
    }

    if (Posts) return res.status(200).json(Posts);
    return res.status(404).json({ error: "Data Not Found" })
}

