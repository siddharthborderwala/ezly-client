import { Button } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React from 'react';
import { IPageData } from '../pages/maker';
import { Formik, Form, Field, FormikHelpers, FieldArray } from 'formik';

type UpdateSocialProps = {
  setPageData: React.Dispatch<React.SetStateAction<IPageData>>;
  pageData: IPageData;
};

const allPlatforms = ['facebook', 'instagram', 'linkedin', 'youtube'];

const UpdateSocial: React.FC<UpdateSocialProps> = ({
  setPageData,
  pageData,
}) => {
  const [socialData, setSocialData] = React.useState<any>([]);

  React.useEffect(() => {
    let socialItems = pageData.blocks.filter((x) => x.type === 'social');
    if (socialItems.length !== 0) {
      setSocialData(socialItems[0]);
    } else {
      console.log('new social block made');

      setSocialData({
        data: {
          platforms: [],
        },
        type: 'social',
        id: nanoid(),
      });
    }
  }, []);

  function handleSubmit(values: any, formikHelpers: FormikHelpers<any>) {
    console.log(values, formikHelpers);
  }

  console.log('gets printed', socialData);

  return (
    <>
      <Formik initialValues={socialData} onSubmit={handleSubmit}>
        {(props) => (
          <Form>
            <FieldArray name="">
              {(arrayHelpers) => (
                <>
                  <Field name="friends[0]" />
                  <Field name="friends[1]" />
                  <Button type="submit">Submit</Button>
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </>
  );
};

// Classname would of form
// fa-brands fa-instagram fa-3x

export default UpdateSocial;
