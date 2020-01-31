export class User
{
  constructor( public id:string,public email:string,private _token:string,private _expiresBy:Date, private _refreshToken:string)
  {}

  get token()
  {
    if(!this._token || new Date() > this._expiresBy)
    {
      this._token = null;
      return null;
    }
    return this._token;
  }
}
