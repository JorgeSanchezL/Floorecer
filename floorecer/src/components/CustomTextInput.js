import { StyleSheet, View,
    Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';

import { Ionicons } from '@expo/vector-icons';

const CustomTextInput = ({control, name, rules,
        icon, width, defaultValue, placeholder, style}) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <>
                    <View style={[
                        styles.wrap,
                        { ...style },
                        error && {
                            borderWidth: 1,
                            borderColor: '#D12727'
                        }
                    ]}>
                        {icon && <Ionicons
                            name={icon}
                            size={20}
                            color={'#565656'}
                            style={{marginRight: 8}}
                        /> }
                        <TextInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder={placeholder}
                            style={[
                                styles.input,
                                {width: !width 
                                    ? (icon ? '85%' : '100%')
                                    : width
                                },
                            ]}
                        />
                    </View>
                </>
            )}
        />
    );
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8
    },
    input: {
        backgroundColor: '#f0f0f0'
    }
});

export default CustomTextInput;