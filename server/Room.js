class Room
{
    constructor(code)
    {
        this.code = code,
        this.players = {},
        this.isPlaying = false
    }
}

module.exports = Room