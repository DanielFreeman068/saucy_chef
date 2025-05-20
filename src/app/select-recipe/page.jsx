import { Suspense } from 'react';
import SelectRecipe from '../components/SelectRecipe';

export default function SuspenseSelectRecipe() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SelectRecipe />
        </Suspense>
    );
}
