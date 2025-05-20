import { Suspense } from 'react';
import VerifyResetCodePage from '../components/VerifyCodeReset';

export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyResetCodePage />
        </Suspense>
    );
}
