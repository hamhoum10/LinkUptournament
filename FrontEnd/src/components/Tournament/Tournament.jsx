import React, { useEffect, useState } from 'react';
import { useParams , useLocation} from 'react-router-dom';
import Group from './Group';
import FetchTour from '../hamhoum/fetchmatchesByTournementId';
import TournamentBracket from './TournamentBracket';
import axios from 'axios';
import { Outlet, useNavigate } from "react-router-dom";

export const Tournament = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [groups, setGroups] = useState(null);
  const [tournament, setTournament] = useState(null);
  const [displayComponent, setDisplayComponent] = useState("groups");
  const { tournamentId } = useParams();

  useEffect(() => {
    const fetchTournament = async () => {
      const response = await axios.get(`http://localhost:8000/tournament/${tournamentId}`);
      const tournamentData = response.data.tournament;

      // Get current date
      const currentDate = new Date();
      // Convert tournament start date to Date object
      const startDate = new Date(tournamentData.date_debut);
      // Convert tournament end date to Date object
      const endDate = new Date(tournamentData.date_fin);

      // Check if tournament has started or ended
      if (currentDate < startDate) {
        tournamentData.status = 'Coming Soon';
      } else if (currentDate > endDate) {
        tournamentData.status = 'Ended';
      } else {
        tournamentData.status = 'Started';
      }

      setTournament({
        ...tournamentData,
        // Format the date_debut field
        date_debut: new Date(tournamentData.date_debut).toLocaleDateString('en-US'),
      });
    };

    const fetchGroups = async () => {
      const response = await axios.get(`http://localhost:8000/group/tournament/${tournamentId}`);
      setGroups(response.data);
    };

    fetchTournament();
    fetchGroups();
  }, [tournamentId]);

  if (!tournament) {
    return (<div class="text-center">
    <div role="status">
        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>)
  }

  if (!groups) {
    return (<div class="text-center">
    <div role="status">
        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>)
  }

  const handleClick = (component) => {
    setDisplayComponent(component);
  };

  return (
    <>
      <div>
        {/* Header */}
        <div class="flex p-6 font-mono">
          <div class=" flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-custom-green">
            <img src={`http://localhost:8000/${tournament.logo}`} alt="" class="absolute z-10 inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
          </div>
          <form class="flex-auto pl-6">
            <div class="relative flex flex-wrap items-baseline pb-6 before:bg-red-500 before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
              <h1 class="relative uppercase w-full flex-none mb-2 text-2xl font-semibold text-black">
                {tournament.name}
              </h1>
              <div class="relative uppercase text-white w-full  ">{tournament.status}</div>
              <div class="relative text-xs text-white ml-90 mt-1  ">{tournament.date_debut}</div>
            </div>
            <div class="flex items-baseline my-6">
              <div class="space-x-3 flex text-sm font-medium"></div>
            </div>
            <div class="flex space-x-2 mb-4 text-sm font-medium">
              <div class="flex space-x-4">
                <button class="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-custom-green text-white" type="submit" onClick={() => navigate(`/manage/editt/${tournament._id}`)}>
                  Edit
                </button>
                
              </div>
              <button class="flex-none flex items-center justify-center w-12 h-12 text-black" type="button" aria-label="Like">
                <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </button>
            </div>
            
            <p class="text-xs leading-6 text-slate-500">{tournament.rules}</p>
          </form>
        </div>
        {/* Hero Image */}
        <div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-4">
  <div className="py-4 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
    {tournament.type !== 'Knockout' && (
      
      <button
        className={`text-lg font-semibold ${displayComponent === 'groups' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'} mx-auto`}
        onClick={() => handleClick("groups")}
      >
        Groups
      </button>
    )}
    {(tournament.type === 'Knockout' || tournament.type === 'Group stage and Knockout') && (
      <button
        className={`text-lg font-semibold ${displayComponent === 'bracket' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'} mx-auto`}
        onClick={() => handleClick("bracket")}
      >
        Bracket
      </button>
    )}
    
      <button
        className={`text-lg font-semibold ${displayComponent === 'fetchtour' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'} mx-auto`}
        onClick={() => handleClick("fetchtour")}
      >
        Matches
      </button>
  
  </div>
</div>

    </div>
        {/* Render Group components */}
        {displayComponent === 'groups' && (
          <div className="flex flex-wrap gap-4">
            {groups.map((group) => (
              <Group key={group._id} groupId={group._id} />
            ))}
          </div>
        )}
        {/* Only render TournamentBracket if tournament type is 'knockout' */}
        {displayComponent === 'bracket' && (tournament.type === 'Knockout' || tournament.type === 'Group stage and Knockout') && (
          <TournamentBracket tournamentId={tournament._id}></TournamentBracket>
        )}
{displayComponent === 'fetchtour' && (
  
    
      <FetchTour key={tournament._id} tournamentId={tournament._id} />
    
  
)}

        
      </div>
    </>
  );
};

export default Tournament;
