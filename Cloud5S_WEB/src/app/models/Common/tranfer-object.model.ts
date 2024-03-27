export interface TranferObject {
   status: boolean,
   data: any,
   messageObject: MessageObject
}

export interface MessageObject {
    code: string,
    message: string,
    messageDetail: string,
    messageType: string
}