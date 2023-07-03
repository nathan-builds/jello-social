import { Card } from '@/components/ui/card';

const Sidebar = () => {
    return (
        <nav className='my-20 h-full'>
            <Card className="flex flex-col h-full">
                <span>Circles</span>
                <span>Account</span>
                <span>Settings</span>
                <span>Help</span>
            </Card>

        </nav>
    );
};

export default Sidebar;