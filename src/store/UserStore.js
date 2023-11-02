import { makeAutoObservable } from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false // переменная с нижним подчеркиванием говорит о том, что ее нельзя изменять
        this._user = {}
        makeAutoObservable(this) // функция из mobx с параметром (объект) this, теперь mobx будет следить за изменением этих переменных, при их изменениях компоненты будут пререндериваться.
    }

    //создаем экшены - это функции, которые состояние изменяют. в данном случае это простая функция, которая принимает параметром булевое значение и присваивает его переменной isAuth
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}
