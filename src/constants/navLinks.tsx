import { ClipboardDocumentCheckIcon, DocumentPlusIcon, Squares2X2Icon, UserIcon } from '@heroicons/react/24/solid'
export const adminNavLinks = [
    {
        name: "Police Listing",
        path: "/",
        icon: <Squares2X2Icon />
    },
    {
        name: "Profile",
        path: '/admin/profile',
        icon: <UserIcon />
    }
];

export const policeNavLinks = [
    {
        name: 'Home',
        path: '/',
        icon: <Squares2X2Icon />
    },
    {
        name: 'FIR Listing',
        path: '/police/listing',
        icon: <ClipboardDocumentCheckIcon />
    },
    {
        name: 'Register FIR',
        path: '/police/register',
        icon: <DocumentPlusIcon />
    },
    {
        name: 'Profile',
        path: '/police/profile',
        icon: <UserIcon />
    }
]
