module.exports = {
    nickname: [
        'Pigeon',
        'Cochon',
        'Pieuvre',
    ],

    getNickname() {
        const i = Math.floor(Math.random() * (this.nickname.length - 1))
        console.log(i)
        return this.nickname[i]
    }
}