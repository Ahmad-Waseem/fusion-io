import StickyNavbar from "./StickyNavbar";

export default function Layout({ children }) {
    return (
        <>
            <StickyNavbar />
            {children}
        </>

    )
}