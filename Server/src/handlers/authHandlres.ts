import { Request, Response, NextFunction } from 'express';
import { auth, db } from '../services/firebase';

export const login = async ( req : Request , res : Response , next : NextFunction)=>{
    const { email, password } = req.body;
    const apiKey = process.env.FIREBASE_API_KEY_; 
  
    if (!apiKey) {
      res.status(500).json({ message: "FIREBASE_API_KEY no configurada" });
      return;
    }
  
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        res.status(400).json({ message: "Error al iniciar sesión", error: errorData });
        return
      }
  
      const data = await response.json();
      res.status(200).json({ message: "Login exitoso", data });
    } catch (error) {
      next(error);
    } 
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, displayName,photoURL } = req.body;
  
    try {
      const userRecord = await auth.createUser({
        email,
        password,
        displayName,
        photoURL: photoURL
      });
      const userDoc = {
        localId: userRecord.uid, 
        displayName,
        email,
        photoURL
      };
      await db.collection('users').doc(userRecord.uid).set(userDoc);
  
      res.status(201).json({ message: "Usuario registrado correctamente", data: userDoc });
    } catch (error) {
      next(error);
    }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const snapshot = await db.collection('users').get();
    
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};



