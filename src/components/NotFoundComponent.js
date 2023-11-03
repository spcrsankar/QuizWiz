import React from 'react'
import './style.css'

export default function NotFoundComponent() {

    return (
        <div className='not-found-page'>
            <div className='start-quiz-box res-box'>
                <h1>404 - Not Found</h1>
                <h3>Sorry, the page you are looking for does not exist.</h3>
                <a href='/'>Click here to go to QuizWiz</a>
            </div>
        </div>

    )
}