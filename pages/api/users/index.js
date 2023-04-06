import data from '../data';

export default async function handler(req, res) {
    const { Users } = data;

    //signin
    if (req.method == "POST") {
        const body = JSON.parse(req.body)
        const user__exist = Users.find(user => user.email == body.email)
        if (user__exist) {
            if (user__exist.pass == body.pass) {
                return res.status(200).json({ status: 'ok', data: { ...user__exist }, message: "Signin successfully..." });
            }
        } else {
            return res.status(401).json({ status: 'refuse', message: "User email/password not match..." });

        }
    }

    //signup
    if (req.method == "PUT") {
        const body = JSON.parse(req.body)
        const user__exist = Users.find(user => user.email == body.email)

        if (!user__exist) {
            const newUser = {
                id: Math.random().toString(36).substr(2, 6),
                ...body
            }

            Users.push(newUser)
            return res.status(201).json({ status: 'ok', message: "Sign up successfully...", data: { ...newUser } });
        } else {
            return res.status(401).json({ status: 'refuse', message: "User already exist..." });

        }
    }

    if (Users) return res.status(200).json(Users);
    return res.status(404).json({ error: "Data Not Found" })
}