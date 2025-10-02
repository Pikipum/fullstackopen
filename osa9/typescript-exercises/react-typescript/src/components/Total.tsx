interface Props {
    total: number;
}

const Total = ({ total }: Props) => {
    return (
        <div>
            total number of exercises: {total}
        </div>
    )
}

export default Total;