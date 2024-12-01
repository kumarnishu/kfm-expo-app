import React from 'react'
import { Menu } from 'react-native-paper'

const CustomMenu = ({ anchor, setAnchor, children }: { anchor: React.ReactNode, setAnchor: React.Dispatch<React.SetStateAction<React.ReactNode | undefined>>, children: React.ReactNode }) => {
    return (
        <Menu
            anchorPosition='bottom'
            visible={anchor ? true : false}
            onDismiss={() => setAnchor(undefined)}
            anchor={anchor}>
            {children}
        </Menu>
    )
}

export default CustomMenu