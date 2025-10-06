import { useEffect, useState } from "react"
import type { Diary } from "./types"
import AddEntry from "./components/AddEntry"
import DiaryEntries from "./components/DiaryEntries"
import diaryService from "./services/diaries"


function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    }
    void fetchDiaryList();
  }, []);


  return (
    <div>
      <AddEntry diaries={diaries} setDiaries={setDiaries} />
      <DiaryEntries diaries={diaries} />
    </div>
  );
}

export default App
