import User from "../models/User.js";

export const registerUser = async (req, res) => {

try {

const user = new User({
name: req.body.name,
email: req.body.email,
password: req.body.password
});

await user.save();

res.json(user);

} catch (err) {

res.status(500).json(err);

}

};

export const loginUser = async (req, res) => {

const user = await User.findOne({
email: req.body.email,
password: req.body.password
});

if (user) {
res.json(user);
} else {
res.json(null);
}

};