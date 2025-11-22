import { useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function usePlayers() {
  const [players, setPlayers] = useState([])
  const [nextAfterId, setNextAfterId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [currentSearch, setCurrentSearch] = useState('')

  const searchPlayers = useCallback(async (searchQuery = '', afterId = null, limit = 300, append = false) => {
    if (!append) {
      setLoading(true)
      setPlayers([])
      setNextAfterId(null)
      setCurrentSearch(searchQuery)
    } else {
      setLoadingMore(true)
    }
    
    setError(null)
    
    try {
      const { data, error: rpcError } = await supabase.rpc('get_players_page', {
        p_search: searchQuery.trim() || null,
        p_after_id: afterId,
        p_limit: limit
      })

      if (rpcError) throw rpcError

      const items = data?.items || []
      const nextCursor = data?.next_after_id ?? null

      const processedPlayers = items.map(player => ({
        id: player.id,
        nickname: player.nickname,
        discriminator: player.discriminator,
        profileUrl: player.profileUrl,
        matchesCount: player.matchesCount || 0
      }))

      if (append) {
        setPlayers(prev => [...prev, ...processedPlayers])
      } else {
        setPlayers(processedPlayers)
      }

      setNextAfterId(nextCursor)
    } catch (err) {
      console.error('Error searching players:', err)
      setError(err.message)
      if (!append) {
        setPlayers([])
      }
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  const loadMore = useCallback(() => {
    if (nextAfterId !== null && !loading && !loadingMore) {
      searchPlayers(currentSearch, nextAfterId, 50, true)
    }
  }, [nextAfterId, currentSearch, loading, loadingMore, searchPlayers])

  const hasMore = nextAfterId !== null

  return {
    players,
    loading,
    loadingMore,
    error,
    hasMore,
    searchPlayers,
    loadMore
  }
}

