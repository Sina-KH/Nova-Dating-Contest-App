export function ageToDate(age: number) {
    const d = new Date();
    d.setFullYear(d.getFullYear() - age);
    return d;
}

export function calculateAge(birthdate: Date) {
    const today = new Date();
    const birthDate = birthdate;

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}
