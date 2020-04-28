import { action, observable, runInAction } from 'mobx'

export interface IFavorite {
    id: string | number
    name: string
}

// tslint:disable-next-line: min-class-cohesion
export class FavoriteStore {
    public readonly favorites = observable<IFavorite>([])

    public constructor() {
        runInAction(() => {
            const json = localStorage.getItem('favorites')
            this.favorites.replace(json ? JSON.parse(json) : [])
        })
    }

    public has(id: number | string): boolean {
        return !!this.favorites.find((favorite) => favorite.id === id)
    }

    @action public push(favorite: IFavorite) {
        if(this.has(favorite.id)) throw new Error('Already exists.')
        this.favorites.push(favorite)
        localStorage.setItem('favorites', JSON.stringify([...this.favorites]))
    }

    @action public shift(favoriteOrId: IFavorite | IFavorite['id']) {
        const id = typeof favoriteOrId === 'object' ? favoriteOrId.id : favoriteOrId
        if(!this.has(id)) throw new Error('Not found.')

        const index = this.favorites.findIndex((favorite) => favorite.id === id)
        const newArray = [
            ...this.favorites.slice(0, index),
            ...this.favorites.slice(index + 1, this.favorites.length),
        ]
        this.favorites.replace(newArray)
        localStorage.setItem('favorites', JSON.stringify([...this.favorites]))
    }

}
