export const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const existingUser = await User.findOne({name});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message:"Email already exists"});
        }
        const user = await User.create({name, email, password});
        res.status(201).json({message:"User created successfully"});
    }
    catch (error) {
        
    }
}

export const login = async (req, res) => {
        res.json({data:"This is login page"});
    }

    export const logout = async (req, res) => {
        res.json({data:"This is logout page"});
    }