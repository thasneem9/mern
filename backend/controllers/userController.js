import User from '../models/User.js'

const postUser = async (req, res) => {
  try {
    const { email, username, password, name } = req.body
    const user = new User({ email, username, password, name })
    await user.save()
    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
  
}

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body
    const deletedUser = await User.findOneAndDelete({ email })
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const { email, username, password, name } = req.body
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { username, password, name },
      { new: true }
    )
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export  { postUser,getUsers,deleteUser,updateUser }
