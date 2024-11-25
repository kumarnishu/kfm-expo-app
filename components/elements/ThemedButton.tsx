import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = TouchableOpacityProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'primary' | 'secondary' | 'link';
    label: string;
};

export function ThemedButton({
    lightColor,
    darkColor,
    type = 'default',
    label,
    style,
    ...rest
}: ThemedButtonProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const backgroundColor = useThemeColor({ light: '#f0f0f0', dark: '#333' }, 'background');

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor },
                type === 'primary' ? styles.primary : undefined,
                type === 'secondary' ? styles.secondary : undefined,
                type === 'link' ? styles.link : undefined,
                style,
            ]}
            {...rest}
        >
            <Text style={[styles.text, { color }]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: '#007BFF',
    },
    secondary: {
        backgroundColor: '#6C757D',
    },
    link: {
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});
