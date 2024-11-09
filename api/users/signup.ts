import { supabase } from '../../util/supabaseClient'
import { CreateUserProps } from '@/types/users'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertUser, insertStats } from '../../util/insertTable'

const createUser = async ( {email, password, options} :CreateUserProps) : Promise<string> => {

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options
    });

    if (error) {
        console.error('Error creating user:', error.message);
        // console.log(error.message) ;
        throw new Error(error.message);
    }

    if(!data?.session || !data?.user?.id || !options?.data?.full_name) {
        console.error("Data wasn't returned correctly");
        throw new Error("Data wasn't returned correctly");
    }

    await insertUser(data.user.id, email, options.data.full_name);
    await insertStats(data.user.id);
    
    await AsyncStorage.setItem('supabase_session', JSON.stringify(data.session));
    console.log('User created and session saved');

    // if (data.session) {
    //     await AsyncStorage.setItem('supabase_session', JSON.stringify(data.session));
    //     console.log('User created and session saved');
    // }
    return JSON.stringify(data.session);
}
export default createUser; 