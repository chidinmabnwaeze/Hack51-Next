import React, {useState} from 'react'
import ShortlistCandidates from '../components/ShortlistCandidates'
import { MOCK_CANDIDATES} from '../shortlists/page'
import { type View } from '../shortlists/page'

const page = () => {
    const [view, setView] = useState<View>({ name: "shortlists" });
  return (
    <ShortlistCandidates
           candidates={MOCK_CANDIDATES}
           targetCount={5}
           onBack={() => setView({ name: "shortlists" })}
           onDeliver={(ids) => {
             // TODO: call your API to deliver shortlist
             console.log("Delivering candidates:", ids);
             setView({ name: "shortlists" });
           }}
         />
  )
}

export default page