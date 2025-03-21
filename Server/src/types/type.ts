
//Tipado para el modelo de Usuario

export type User = {
    uid:string;
    displayName:string;
    email:string;
    photoURL?:string;
}

export type Message ={
    conversationId?: string;
    senderId:string;
    receiverId:string;
    content:string;
    timestamp:string;

    fileUrl?:string;
    fileType?: 'image' | 'document' | 'video';
}

