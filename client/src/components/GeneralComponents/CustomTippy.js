import React from "react";
import Tippy from "@tippyjs/react/headless";
import 'tippy.js/dist/tippy.css';
import { useSpring } from "react-spring";

//custom Tippy to display a user summary on hover
const CustomTippy = ({content, children}) => {

    //animation to define hover behaviour
    const initialStyles = { opacity: 0 };
    const [props, setSpring] = useSpring(() => initialStyles);
    const config = { tension: 200, friction: 30 };

    function onMount() {
        setSpring({
        opacity: 1,
        onRest: () => {},
        config
        });
    }

    function onHide({ unmount }) {
        setSpring({
        ...initialStyles,
        onRest: unmount,
        config: { ...config }
        });
    }

    return (
        <Tippy 
            render={() => (content)}
            animation={true}
            placement='right'
            interactive='true'
            onMount={onMount}
            onHide={onHide}
        >
            {children}
        </Tippy>
    );
}

export default CustomTippy;