import {ScrollView, StyleSheet, Text, View, Alert} from 'react-native';
import {Formik} from 'formik';
import {Input, Button, Toggle} from '@ui-kitten/components';
import * as Yup from 'yup';
const ForkmikYup = () => {
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Zorunlu alan'),
    surname: Yup.string().required('Zorunlu alan'),
    email: Yup.string().required('Lütfen geçerli bir email adresi giriniz!'),
    phone: Yup.string()
      .required('Zorunlu alan')
      .min(11, 'Lütfen minimum 11 hane olarak giriniz...')
      .max(13, 'Lütfen maximum 13 hane giriniz...'),
    password: Yup.string()
      .required('Zorunlu alan')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*\(\)\-_=\+\[\]{};:'",.<>?/\\|])[A-Za-z\d!@#\$%\^&\*\(\)\-_=\+\[\]{};:'",.<>?/\\|]{8,25}$/,
        'Şifre en az 8, en fazla 25 karakter olmalı, en az bir büyük harf, bir küçük harf ve bir özel karakter içermelidir.',
      ),
    passwordConfirm: Yup.string()
      .required('Zorunlu alan')
      .oneOf([Yup.ref('password')], 'Şifreler uyuşmuyor'),
    agrementConfirm: Yup.bool()
      .required('zorunlu Alan')
      .oneOf([true], 'sözleşmeyi onaylamanız gerekiyor.'),
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 20,
          backgroundColor: 'tomato',
          minHeight: 125,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 30,
            marginTop: 30,
            color: 'white',
            fontWeight: 'bold',
          }}>
          Kayıt Oluştur
        </Text>
      </View>

      <View style={{flex: 1, padding: 10}}>
        <ScrollView>
          <Formik
            initialValues={{
              email: '',
              name: '',
              surname: '',
              phone: '',
              password: '',
              passwordConfirm: '',
              agrementConfirm: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={values =>
              Alert.alert('Form değerleri', JSON.stringify(values, null, 2))
            }>
            {({handleChange, handleSubmit, values, setFieldValue, errors}) => (
              <View>
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.name}
                  label={'Name'}
                  placeholder="Adınızı giriniz"
                  onChangeText={handleChange('name')}
                  status={errors.name ? 'danger' : 'basic'}
                  caption={errors.name}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.surname}
                  label={'Surname'}
                  placeholder="Soyisim bilgisi giriniz"
                  onChangeText={handleChange('surname')}
                  status={errors.surname ? 'danger' : 'basic'}
                  caption={errors.surname}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.email}
                  label={'E-mail'}
                  placeholder="E-mail bilgisini giriniz.."
                  onChangeText={handleChange('email')}
                  status={errors.email ? 'danger' : 'basic'}
                  caption={errors.email}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.phone}
                  label={'Phone'}
                  placeholder="Telefon Numaranızı giriniz.."
                  onChangeText={handleChange('phone')}
                  status={errors.phone ? 'danger' : 'basic'}
                  caption={errors.phone}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.password}
                  label={'Password'}
                  placeholder="Şifrenizi giriniz.."
                  onChangeText={handleChange('password')}
                  status={errors.password ? 'danger' : 'basic'}
                  caption={errors.password}
                  secureTextEntry={true}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.passwordConfirm}
                  label={'Password-Control'}
                  placeholder="Şifre Tekrar Girin"
                  onChangeText={handleChange('passwordConfirm')}
                  status={errors.passwordConfirm ? 'danger' : 'basic'}
                  caption={errors.surname}
                  secureTextEntry={true}
                />
                <View style={{marginVertical: 4, marginHorizontal: 10}}>
                  <Toggle
                    checked={values.agrementConfirm}
                    onChange={value => setFieldValue('agrementConfirm', value)}>
                    Kullanıcı Sözleşmesini ve Gizlilik Anlaşmasını kabul
                    ediyorum.
                  </Toggle>
                  {errors.agrementConfirm && (
                    <Text style={{color: 'red'}}>{errors.agrementConfirm}</Text>
                  )}
                </View>
                <Button
                  style={{marginTop: 30}}
                  status="warning"
                  onPress={handleSubmit}>
                  Kaydet
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
};

export default ForkmikYup;

const styles = StyleSheet.create({
  container: {flex: 1},
});
