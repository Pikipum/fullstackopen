import { useState } from "react"
import diaryService from "../services/diaries"
import type { Diary, DiaryFormValues } from "../types"
import type { Visibility, Weather } from "../types"


interface Props {
    diaries: Diary[]
    setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}

const AddEntry = ({ diaries, setDiaries }: Props) => {
    const [newDiaryDate, setNewDiaryDate] = useState('');
    const [newDiaryVisibility, setNewDiaryVisibility] = useState('');
    const [newDiaryWeather, setNewDiaryWeather] = useState('');
    const [newDiaryComment, setNewDiaryComment] = useState('');

    const diaryCreation = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newDiary: DiaryFormValues = {
            date: newDiaryDate,
            visibility: newDiaryVisibility as Visibility,
            weather: newDiaryWeather as Weather,
            comment: newDiaryComment,
        };

        try {
            const diary = await diaryService.create(newDiary);
            setDiaries(diaries.concat(diary));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h2>Add new entry</h2>
            <form onSubmit={diaryCreation}>
                <div>
                    date: <input
                        value={newDiaryDate}
                        onChange={(event) => setNewDiaryDate(event.target.value)}
                    />
                </div>
                <div>
                    visibility: <input
                        value={newDiaryVisibility}
                        onChange={(event) => setNewDiaryVisibility(event.target.value)}
                    />
                </div>
                <div>
                    weather: <input
                        value={newDiaryWeather}
                        onChange={(event) => setNewDiaryWeather(event.target.value)}
                    />
                </div>
                <div>
                    comment: <input
                        value={newDiaryComment}
                        onChange={(event) => setNewDiaryComment(event.target.value)}
                    />
                </div>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default AddEntry