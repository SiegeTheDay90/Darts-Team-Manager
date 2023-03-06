// import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Team = () => {
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory();
    if(!sessionUser){
        history.push('/')
    }

    const team = useSelector(state => state.teams[sessionUser?.team_id]);
    return (
        <>
            <h2>{team?.name || `Team Not Found for ${sessionUser?.firstname}`}</h2>
        </>
    )
}

export default Team;