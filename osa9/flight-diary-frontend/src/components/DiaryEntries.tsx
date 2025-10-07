import type { Diary } from "../types";

interface Props {
    diaries: Diary[]
}

const DiaryEntries = ({ diaries }: Props) => {
    return (
        <div>
            <h2>Diary entries</h2>
            <ul>
                {diaries.map(diary =>
                    <li key={diary.id}>
                        <h3>{diary.date}</h3>
                        <div>
                            visibility: {diary.visibility}
                        </div>
                        <div>
                            weather: {diary.weather}
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default DiaryEntries;