interface Props {
    name: string;
}

const Header = ({ name }: Props) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}

export default Header;