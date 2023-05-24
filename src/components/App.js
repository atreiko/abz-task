import { useState, useEffect } from 'react'
import { Header, Hero, Success } from './widgets';
import { Cards, Form } from './features';
import * as abzApi from 'services/api/abzApi.js';
import '../scss/index.scss';

const App = () => {
  const [positions, setPositions] = useState([]); 
  const [cards, setCards] = useState([]);
  const [listInfo, setListInfo] = useState({}); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [userId, setUserId] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  // ========================== Loading and Errors in Promise ==================================
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPositions, setIsLoadingPositions] = useState(false);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [error, setError] = useState(null);
  const [errorPositions, setErrorPositions] = useState(null);
  const [errorUserInfo, setErrorUserInfo] = useState(null);

  useEffect(() => {
    if (!userId) return 
    (async function fetchUsers() {
      setIsLoadingUserInfo(true)
      try {
        const { user } = await abzApi.getUserById(userId)
        setCurrentUser(user);
      } catch (error) {
        setErrorUserInfo(error.message);
      } finally {
        setIsLoadingUserInfo(false);
      }
    })()
  }, [userId])

  useEffect(() => {
    (async function fetchUsers() {
      setIsLoading(true)
      setError(false)
      try {
        const { 
          users, 
          page, 
          total_pages, 
          total_users, 
          count, 
          links 
        } = await abzApi.getUsers()
        setCards(users)
        setListInfo({
          page,
          total_pages,
          total_users,
          count,
          links
        })
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [userId])

  const nextPage = async () => {
    setIsLoading(true)
    setError(false)
    try {
      const { 
        users, 
        page, 
        total_pages, 
        total_users, 
        count, 
        links 
      } = await abzApi.getUsers(currentPage + 1)
      setCards(users)
      setListInfo({
        page,
        total_pages,
        total_users,
        count,
        links
      })
      setCurrentPage(currentPage + 1)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const prevPage = async () => {
    setIsLoading(true)
    setError(false)
    try {
      const { 
        users, 
        page, 
        total_pages, 
        total_users, 
        count, 
        links 
      } = await abzApi.getUsers(currentPage - 1)
      setCards(users)
      setListInfo({
        page,
        total_pages,
        total_users,
        count,
        links
      })
      setCurrentPage(currentPage - 1)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    (async function fetchPositions() {
        setIsLoadingPositions(true);
      try {
        const data = await abzApi.getPositions();
        setPositions(data.positions);
      } catch (error) {
        setErrorPositions(error.message);
      } finally {
        setIsLoadingPositions(false);
      }
    })();
  }, [])

  const addUser = async formData => { 
    setIsLoading(true)
    try {
      await abzApi.getToken()
      const data = await abzApi.addUser(formData)
      setUserId(data.user_id)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ paddingBottom: 100 }}>
      <Header 
        currentUser={currentUser}
        error={errorUserInfo} 
        isLoading={isLoadingUserInfo}
      />
      <main>
        <Hero />
        <Cards 
          title='Working with GET request'
          cards={cards} 
          error={error}
          isLoading={isLoading}
          prevPage={prevPage}
          nextPage={nextPage}
          nextUrl={listInfo?.links?.next_url}
          prevUrl={listInfo?.links?.prev_url}
        />
        <Form 
          title='Working with POST request'
          onSubmit={addUser}
          positions={positions}
          isLoading={isLoadingPositions}
          errorPositions={errorPositions}
          userId={userId}
        />
        {userId && <Success />}
      </main>
    </div>
  )
}

export default App
