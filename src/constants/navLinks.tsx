import { ClipboardDocumentCheckIcon, DocumentPlusIcon, Squares2X2Icon, UserIcon } from '@heroicons/react/24/solid'
export const adminNavLinks = [
    {
        name: "Police Listing",
        path: "/admin",
        icon: <Squares2X2Icon />
    },
    {
        name: "FIR Listing",
        path: '/admin/fir-listing',
        icon: <ClipboardDocumentCheckIcon />
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
        name: 'Profile',
        path: '/police/profile',
        icon: <UserIcon />
    }
]
