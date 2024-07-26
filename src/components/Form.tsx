import { useEffect, useRef, useState } from 'react';

type Props = {
  formId: string;
  returnUrl?: string;
  onCompleted?: (data: Record<string, any>) => void;
  onStepChange?: (step: number) => void;
  onLoading?: (loading: boolean) => void;
  onLoaded?: (loaded: boolean) => void;
};
const Form: React.FC<Props> = (props) => {
  const formRef = useRef<HTMLElement | null>(null);
  const [formInit, setFormInit] = useState(false);

  useEffect(() => {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    if (!head) return;
    script.setAttribute('src', 'https://dev.signupnotes-sdk.pages.dev/form.js');
    head.appendChild(script);
    script.onload = () => {
      setFormInit(true);
    };
    return () => {
      head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!formInit) return;
    formRef.current?.addEventListener('step-change', (e) => {
      if (props.onStepChange) props.onStepChange((e as CustomEvent<number>).detail);
    });
    formRef.current?.addEventListener('submit-data', (e) => {
      if (props.onCompleted) props.onCompleted((e as CustomEvent<Record<string, any>>).detail.formData);
    });
    formRef.current?.addEventListener('loading', (e) => {
      if (props.onLoading) props.onLoading((e as CustomEvent<boolean>).detail);
    });
    formRef.current?.addEventListener('loaded', (e) => {
      if (props.onLoaded) props.onLoaded((e as CustomEvent<boolean>).detail);
    });
    return () => {
      formRef.current?.removeEventListener('step-change', () => {});
      formRef.current?.removeEventListener('submit-data', () => {});
      formRef.current?.removeEventListener('loading', () => {});
      formRef.current?.removeEventListener('loaded', () => {});
    };
  }, [formInit]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <form-element ref={formRef} form-id={props.formId} return-url={props.returnUrl} />;
    </div>
  );
};
export default Form;
