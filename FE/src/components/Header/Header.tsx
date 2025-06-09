import { headerStyle, spanKav } from "./HeaderStyle"


const Header = () => {
    return (
        <>
            <div style={headerStyle}>
                <span style={spanKav}> - </span>
                Sparklyn
                <span style={spanKav}> - </span>
            </div>
        </>
    )
}

export default Header