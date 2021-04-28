class Room
{
    constructor(code)
    {
        this.code = code,
        this.players = {},
        this.votes = [],
        this.votesPlayers = [],
        this.isPlaying = false
    }
}

module.exports = Room