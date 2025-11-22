import {useState} from "react";
import {supabase} from "../lib/supabase.js";

export function useMatches() {
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchMatchesByPlayerId = async (playerId) => {
        setLoading(true)
        setError(null)

        try {
            const { data, error } = await supabase
                .from('MatchPlayer')
                .select(`
          MatchesId,
          Matches (
            MatchUrl,
            DateOfPlay,
            winTeam
          )
        `)
                .eq('PlayersId', playerId)

            if (error) throw error

            const matchesData = (data || [])
                .map(mp => {
                    const match = mp.Matches
                    if (!match) return null
                    return {
                        matchUrl: match.MatchUrl,
                        dateOfPlay: match.DateOfPlay,
                        winTeam: match.winTeam
                    }
                })
                .filter(Boolean)
                .sort((a, b) => new Date(b.dateOfPlay) - new Date(a.dateOfPlay))

            setMatches(matchesData)
        } catch (err) {
            console.error('Error fetching matches:', err)
            setError(err.message)
            setMatches([])
        } finally {
            setLoading(false)
        }
    }

    const clearMatches = () => {
        setMatches([])
        setError(null)
    }

    return { matches, loading, error, fetchMatchesByPlayerId, clearMatches }
}
