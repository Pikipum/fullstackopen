import type { CoursePart } from "./Content";

interface PartProps {
    course: CoursePart;
}

const Part = ({ course }: PartProps) => {
    switch (course.kind) {
        case "basic":
            return (
                <div>
                    <strong>{course.name} {course.exerciseCount}</strong>
                    <div><em>{course.description}</em></div>
                </div>
            );
        case "group":
            return (
                <div>
                    <strong>{course.name} {course.exerciseCount}</strong>
                    <div>Project exercises: {course.groupProjectCount}</div>
                </div>
            );
        case "background":
            return (
                <div>
                    <strong>{course.name} {course.exerciseCount}</strong>
                    <div><em>{course.description}</em></div>
                    <div>Background: {course.backgroundMaterial}</div>
                </div>
            );
        case "special":
            return (
                <div>
                    <strong>{course.name} {course.exerciseCount}</strong>
                    <div><em>{course.description}</em></div>
                    required skills: {course.requirements.join(", ")}
                </div>
            )
        default:
            return <div>Unknown course part</div>;
    }
};

export default Part;