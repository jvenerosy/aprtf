<script lang="ts">
    import Button from '$lib/components/forms/Button.svelte';
    import { store } from '$lib/stores/Store';
    import { fade } from 'svelte/transition';
    import { enhance } from '$app/forms';

    import { PUBLIC_HOST_API } from '$env/static/public';

    $store.nav = 'colloque';

    let { data, form = {} }: { data: any; form?: any } = $props();
    const colloque = data.colloque;

    let step = $state(form?.step ?? 1);
    $effect(() => {
        if (form?.step !== undefined) {
            step = form.step;
        }
    });

    function nextStep() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function prevStep(e: any) {
        e.preventDefault();
        step--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    let handicap = $state(form?.answer?.handicap ?? form?.handicap ?? '');
    let handicapRythme = $state(form?.answer?.handicapRythme ?? form?.handicapRythme ?? '');
    let handicapPedago = $state(form?.answer?.handicapPedago ?? form?.handicapPedago ?? '');
    let finance = $state(form?.answer?.finance ?? form?.finance ?? 0);
    let cadre = $state(form?.answer?.cadre ?? form?.cadre ?? '');
    let context = $state(form?.answer?.context ?? form?.context ?? '');
    let level = $state(form?.answer?.level ?? form?.level ?? '');


</script>

<svelte:head>
<title>{colloque.titre}</title>
<meta name="robots" content="index follow" />
</svelte:head>

<section class="section">
    <div class="container is-max-widescreen">
        <div class="columns is-variable is-8">
            <div class="column is-7">
                <div class="rows">
                    <div class="row">
                        <h1 class="title is-1">Inscription à la journée clinique thématique</h1>
                        <p class="subtitle">Débute le {colloque.date_debut} jusqu'au {colloque.date_fin}</p>
                    </div>
                    <div class="row">
                        <div class="step">
                            <div class="total">
                                <div class="current" style="width: calc({step - 1}*20%)"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="box">
                            <div class="box-content">
                                <div class="step {step === 1 ? '': 'is-hidden'}" transition:fade>
                                    <form method="POST" action="?/step1" use:enhance>
                                        {#key form}
                                        <input type="hidden" name="slug" value="{colloque.titre}">
                                        <div class="fieldset">
                                            <div class="field">
                                                <legend class="label">Comment vous appelez-vous ?</legend>
                                            </div>
                                            <div class="field">
                                                <div class="columns">
                                                    <div class="column">
                                                        <label for="firstname" class="label is-2">Prénom</label>
                                                        <div class="control">
                                                            <input
                                                                type="text"
                                                                class="input"
                                                                id="firstname"
                                                                name="firstname"
                                                                value="{form?.answer?.firstname ?? form?.firstname ?? ''}"
                                                            />
                                                        </div>
                                                        {#if form?.errors?.firstname}
                                                        <p class="has-text-danger mention">{form?.errors?.firstname[0]}</p>
                                                        {/if}
                                                    </div>
                                                    <div class="column">
                                                        <label for="lastname" class="label is-2">Nom</label>
                                                        <div class="control">
                                                            <input
                                                                type="text"
                                                                class="input"
                                                                id="lastname"
                                                                name="lastname"
                                                                value="{form?.answer?.lastname ?? form?.lastname ?? ''}"
                                                            />
                                                        </div>
                                                        {#if form?.errors?.lastname}
                                                        <p class="has-text-danger mention">{form?.errors?.lastname[0]}</p>
                                                        {/if}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="fieldset">
                                            <div class="field">
                                                <legend class="label">Comment vous contacter ?</legend>
                                            </div>
                                            <div class="field">
                                                <label for="phone" class="label is-2">Numéro de téléphone</label>
                                                <div class="control">
                                                    <input
                                                        type="text"
                                                        class="input"
                                                        id="phone"
                                                        name="phone"
                                                        value="{form?.answer?.phone ?? form?.phone ?? ''}"
                                                    />
                                                </div>
                                                {#if form?.errors?.phone}
                                                <p class="has-text-danger mention">{form?.errors?.phone[0]}</p>
                                                {/if}
                                            </div>
                                            <div class="field">
                                                <label for="email" class="label is-2">Mail</label>
                                                <div class="control">
                                                    <input
                                                        type="email"
                                                        class="input"
                                                        id="email"
                                                        name="email"
                                                        value="{form?.answer?.email ?? form?.email ?? ''}"
                                                    />
                                                </div>
                                                {#if form?.errors?.email}
                                                <p class="has-text-danger mention">{form?.errors?.email[0]}</p>
                                                {/if}
                                            </div>
                                        </div>
                                        <div class="fieldset">
                                            <div class="field">
                                                <legend class="label">Quelles sont vos coordonnées postales ?</legend>
                                            </div>
                                            <div class="field">
                                                <label for="address" class="label is-2">Adresse postale</label>
                                                <div class="control">
                                                    <input
                                                        type="text"
                                                        class="input"
                                                        id="address"
                                                        name="address"
                                                        value="{form?.answer?.address ?? form?.address ?? ''}"
                                                    />
                                                </div>
                                                {#if form?.errors?.address}
                                                <p class="has-text-danger mention">{form?.errors?.address[0]}</p>
                                                {/if}
                                            </div>
                                            <div class="field">
                                                <div class="columns">
                                                    <div class="column">
                                                        <label for="postal_code" class="label is-2">Code postal</label>
                                                        <div class="control">
                                                            <input
                                                                type="text"
                                                                class="input"
                                                                id="postal_code"
                                                                name="postalCode"
                                                                value="{form?.answer?.postalCode ?? form?.postalCode ?? ''}"
                                                            />
                                                        </div>
                                                        {#if form?.errors?.postalCode}
                                                        <p class="has-text-danger mention">{form?.errors?.postalCode[0]}</p>
                                                        {/if}
                                                    </div>
                                                    <div class="column">
                                                        <label for="city" class="label is-2">Ville</label>
                                                        <div class="control">
                                                            <input
                                                                type="text"
                                                                class="input"
                                                                id="city"
                                                                name="city"
                                                                value="{form?.answer?.city ?? form?.city ?? ''}"
                                                            />
                                                        </div>
                                                        {#if form?.errors?.city}
                                                        <p class="has-text-danger mention">{form?.errors?.city[0]}</p>
                                                        {/if}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="columns is-vcentered">
                                            <div class="column is-narrow">
                                                <a href="/modules-courts/{data.slug}" class="link">Annuler</a>
                                            </div>
                                            <div class="column"></div>
                                            <div class="column is-narrow">
                                                <div class="buttons">
                                                    <Button text="Suivant →" onclick={nextStep} />
                                                </div>
                                            </div>
                                        </div>
                                        {/key}
                                    </form>
                                </div>
                                <div class="step {step === 2 ? '': 'is-hidden'}" transition:fade>
                                    <form method="POST" action="?/step2" use:enhance>
                                        {#key form}
                                        <div class="fieldset">
                                            <div class="field">
                                                <legend class="label">Quelques informations complémentaires</legend>
                                                <label for="connu" class="label is-2">Comment avez-vous connu l’APRTF ?</label>
                                                <div class="control">
                                                    <div class="select">
                                                        <select
                                                            value="{form?.answer?.connu ?? form?.connu ?? ''}"
                                                            name="connu"
                                                            id="connu"
                                                        >
                                                            <option value="" disabled selected>Selectionnez une réponse</option>
                                                            <option value="1">Par le site internet</option>
                                                            <option value="2">Vous connaissez quelqu'un formé à l'APRTF</option>
                                                            <option value="3">Vous êtes actuellement en formation à l'APRTF</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {#if form?.errors?.connu}
                                                <p class="has-text-danger mention">{form?.errors?.connu[0]}</p>
                                                {/if}
                                            </div>
                                        </div>
                                        <div class="fieldset">
                                            <div class="field">
                                                <legend class="label">Êtes-vous en situation de handicap ?</legend>
                                                <div class="control">
                                                    <label for="handicap" class="radio is-2">
                                                        Oui
                                                        <input
                                                            type="radio"
                                                            bind:group={handicap}
                                                            name="handicap"
                                                            value="true"
                                                            class="radio"
                                                            id="handicap"
                                                            />
                                                        </label>
                                                        <label for="handicapNo" class="radio is-2">
                                                            Non
                                                            <input
                                                            type="radio"
                                                            bind:group="{handicap}"
                                                            name="handicap"
                                                            value="false"
                                                            class="radio"
                                                            id="handicapNo"
                                                        />
                                                    </label>
                                                </div>
                                                {#if form?.errors?.handicap}
                                                <p class="has-text-danger mention">{form?.errors?.handicap[0]}</p>
                                                {/if}
                                            </div>
                                            {#if handicap === 'true'}
                                            <div class="field">
                                                <label for="" class="label is-2">Votre situation de handicap nécessite-t-elle une adaptation ?</label>
                                                <div class="control">
                                                    <label class="checkbox">
                                                        <input
                                                            name="handicapAdapt"
                                                            value="rythme"
                                                            class="checkbox"
                                                            type="checkbox"
                                                            bind:group={handicapRythme}
                                                        />
                                                        Rythmes et temps de formation adaptées
                                                    </label>
                                                    <label class="checkbox">
                                                        <input
                                                            name="handicapAdapt"
                                                            value="pedago"
                                                            class="checkbox"
                                                            type="checkbox"
                                                            bind:group={handicapPedago}
                                                        />
                                                        Modalités pédagogiques, contenus, supports et outils
                                                    </label>
                                                </div>
                                            </div>
                                            {/if}
                                        </div>
                                        <div class="fieldset">
                                            <div class="field">
                                                <legend class="label">Renseignements professionnels</legend>
                                            </div>
                                            <div class="field">
                                                <label for="profession" class="label is-2">Profession</label>
                                                <div class="control">
                                                    <input
                                                        type="text"
                                                        class="input"
                                                        name="profession"
                                                        id="profession"
                                                        value="{form?.answer?.profession ?? form?.profession ?? ''}"
                                                    />
                                                </div>
                                                {#if form?.errors?.profession}
                                                <p class="has-text-danger mention">{form?.errors?.profession[0]}</p>
                                                {/if}
                                            </div>
                                            <div class="field">
                                                <div class="columns">
                                                    <div class="column">
                                                        <label for="etablissement" class="label is-2">Etablissement</label>
                                                        <div class="control">
                                                            <input
                                                                type="text"
                                                                class="input"
                                                                name="etablissement"
                                                                id="etablissement"
                                                                value="{form?.answer?.etablissement ?? form?.etablissement ?? ''}"
                                                            />
                                                        </div>
                                                        {#if form?.errors?.etablissement}
                                                        <p class="has-text-danger mention">{form?.errors?.etablissement[0]}</p>
                                                        {/if}
                                                    </div>
                                                    <div class="column">
                                                        <label for="service" class="label is-2">Service ou structure d’exercice</label>
                                                        <div class="control">
                                                            <input
                                                                type="text"
                                                                class="input"
                                                                name="service"
                                                                id="service"
                                                                value="{form?.answer?.service ?? form?.service ?? ''}"
                                                            />
                                                        </div>
                                                        {#if form?.errors?.service}
                                                        <p class="has-text-danger mention">{form?.errors?.service[0]}</p>
                                                        {/if}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="columns is-vcentered">
                                            <div class="column is-narrow">
                                                <a href="/modules-courts/{data.slug}" class="link">Annuler</a>
                                            </div>
                                            <div class="column"></div>
                                            <div class="column is-narrow">
                                                <div class="buttons">
                                                    <Button theme="is-inverted" text="← Précédent" onclick={prevStep} />
                                                    <Button text="Suivant →" />
                                                </div>
                                            </div>
                                        </div>
                                        {/key}
                                    </form>
                                </div>
                                <div class="step {step === 3 ? '': 'is-hidden'}" transition:fade>
                                    <form method="POST" action="?/step3" use:enhance>
                                        {#key form}
                                        <div class="fieldset">
                                            <div class="field">
                                                <legend class="label">Questions de positionnement</legend>
                                                <label for="objectif" class="label is-2">Quels sont vos objectifs et attentes quant à cette formation ?</label>
                                                <div class="control">
                                                    <textarea
                                                        id="objectif"
                                                        class="textarea"
                                                        placeholder="Exprimez vous ici"
                                                        name="objectif"
                                                        value="{form?.answer?.objectif ?? form?.objectif ?? ''}"
                                                    ></textarea>
                                                    {#if form?.errors?.objectif}
                                                    <p class="has-text-danger mention">{form?.errors?.objectif[0]}</p>
                                                    {/if}
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label for="level" class="label is-2">Niveau de connaissance ?</label>
                                                <div class="control">
                                                    <label for="level_1" class="radio is-2">
                                                        <input
                                                            value="1"
                                                            type="radio"
                                                            class="radio"
                                                            name="level"
                                                            id="level_1"
                                                            bind:group={level}
                                                        />
                                                        Peu de connaissance
                                                    </label>
                                                </div>
                                                <div class="control">
                                                    <label for="level_2" class="radio is-2">
                                                        <input
                                                            value="2"
                                                            type="radio"
                                                            class="radio"
                                                            name="level"
                                                            id="level_2"
                                                            bind:group={level}
                                                        />
                                                        Connaissance théorique
                                                    </label>
                                                </div>
                                                <div class="control">
                                                    <label for="level_3" class="radio is-2">
                                                        <input
                                                            value="3"
                                                            type="radio"
                                                            class="radio"
                                                            name="level"
                                                            id="level_3"
                                                            bind:group={level}
                                                        />
                                                        Connaissance théorique et pratique
                                                    </label>
                                                </div>
                                                {#if form?.errors?.level}
                                                <p class="has-text-danger mention">{form?.errors?.level[0]}</p>
                                                {/if}
                                                <div class="control">
                                                    <textarea
                                                        class="textarea"
                                                        placeholder="Exprimez vous ici"
                                                        name="connaissance"
                                                        value="{form?.answer?.connaissance ?? form?.connaissance ?? ''}"
                                                    ></textarea>
                                                    {#if form?.errors?.connaissance}
                                                    <p class="has-text-danger mention">{form?.errors?.connaissance[0]}</p>
                                                    {/if}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="columns is-vcentered">
                                            <div class="column is-narrow">
                                                <a href="/modules-courts/{data.slug}" class="link">Annuler</a>
                                            </div>
                                            <div class="column"></div>
                                            <div class="column is-narrow">
                                                <div class="buttons">
                                                    <Button theme="is-inverted" text="← Précédent" onclick={prevStep} />
                                                    <Button text="Suivant →" />
                                                </div>
                                            </div>
                                        </div>
                                        {/key}
                                    </form>
                                </div>
                                <div class="step {step === 4 ? '': 'is-hidden'}" transition:fade>
                                    <form method="POST" action="?/step4" use:enhance>
                                        {#key form}
                                        <div class="fieldset">
                                            <div class="field">
                                                <legend class="label">Questions de positionnement</legend>
                                            </div>
                                            <div class="field">
                                                <label class="label is-2" for="context">Dans quel contexte(s) professionnel(s) recevez-vous des familles <span>(plusieurs réponses possibles)</span> ?</label>
                                                <div class="control">
                                                    <label class="checkbox">
                                                        <input
                                                            class="checkbox"
                                                            type="checkbox"
                                                            name="context"
                                                            value="liberal"
                                                            bind:group={context}
                                                        />
                                                        En libéral
                                                    </label>
                                                </div>
                                                <div class="control">
                                                    <label class="checkbox">
                                                        <input
                                                            class="checkbox"
                                                            type="checkbox"
                                                            name="context"
                                                            value="institution"
                                                            bind:group={context}
                                                        />
                                                        En institution
                                                    </label>
                                                </div>
                                                <div class="control">
                                                    <label class="checkbox">
                                                        <input
                                                            class="checkbox"
                                                            type="checkbox"
                                                            name="context"
                                                            value="structure_adulte"
                                                            bind:group={context}
                                                        />
                                                        Dans une structure de psychiatrie adulte
                                                    </label>
                                                </div>
                                                <div class="control">
                                                    <label class="checkbox">
                                                        <input
                                                            class="checkbox"
                                                            type="checkbox"
                                                            name="context"
                                                            value="structure_pedopsy"
                                                            bind:group={context}
                                                        />
                                                        Dans une structure de pédopsychiatrie
                                                    </label>
                                                </div>
                                                <div class="control">
                                                    <label class="checkbox">
                                                        <input
                                                            class="checkbox"
                                                            type="checkbox"
                                                            name="context"
                                                            value="medico_social"
                                                            bind:group={context}
                                                        />
                                                        Dans le secteur médico-social
                                                    </label>
                                                </div>
                                                <div class="control">
                                                    <label class="checkbox">
                                                        <input
                                                            class="checkbox"
                                                            type="checkbox"
                                                            name="context"
                                                            value="educatif"
                                                            bind:group={context}
                                                        />
                                                        Dans le milieu éducatif
                                                    </label>
                                                </div>
                                                <div class="control">
                                                    <label class="checkbox">
                                                        <input
                                                            class="checkbox"
                                                            type="checkbox"
                                                            name="context"
                                                            value="associatif"
                                                            bind:group={context}
                                                        />
                                                        Dans le milieu social et/ou associatif
                                                    </label>
                                                </div>
                                            </div>
                                            {#if form?.errors?.context}
                                            <p class="has-text-danger mention">{form?.errors?.context[0]}</p>
                                            {/if}
                                        </div>
                                        <div class="fieldset">
                                            <div class="field">
                                                <label class="label is-2" for="cadre">Quel(s) est (sont) votre (vos) cadre(s) de travail avec les familles<span>(plusieurs réponses possibles)</span> ?</label>
                                                <div class="control">
                                                    <label class="checkbox">
                                                        <input
                                                            class="checkbox"
                                                            type="checkbox"
                                                            name="cadre"
                                                            bind:group={cadre}
                                                            value="participe"
                                                        />
                                                        Je participe ou conduits des entretiens familiaux
                                                    </label>
                                                </div>
                                                <div class="control">
                                                    <label class="checkbox">
                                                        <input
                                                            class="checkbox"
                                                            type="checkbox"
                                                            name="cadre"
                                                            bind:group={cadre}
                                                            value="pratique"
                                                        />
                                                        Je pratique la thérapie familiale
                                                    </label>
                                                </div>
                                                <div class="control">
                                                    <label class="checkbox">
                                                        <input
                                                            class="checkbox"
                                                            type="checkbox"
                                                            name="cadre"
                                                            bind:group={cadre}
                                                            value="seul"
                                                        />
                                                        Je travaille seul
                                                    </label>
                                                </div>
                                                <div class="control">
                                                    <label class="checkbox">
                                                        <input
                                                            class="checkbox"
                                                            type="checkbox"
                                                            name="cadre"
                                                            bind:group={cadre}
                                                            value="equipe"
                                                        />
                                                        Je travaille en équipe
                                                    </label>
                                                </div>
                                                <div class="control">
                                                    <label class="checkbox">
                                                        <input
                                                            class="checkbox"
                                                            type="checkbox"
                                                            name="cadre"
                                                            bind:group={cadre}
                                                            value="filmer"
                                                        />
                                                        Je peux filmer les entretiens
                                                    </label>
                                                </div>
                                            </div>
                                            {#if form?.errors?.cadre}
                                            <p class="has-text-danger mention">{form?.errors?.cadre[0]}</p>
                                            {/if}
                                        </div>
                                        <div class="columns is-vcentered">
                                            <div class="column is-narrow">
                                                <a href="/modules-courts/{data.slug}" class="link">Annuler</a>
                                            </div>
                                            <div class="column"></div>
                                            <div class="column is-narrow">
                                                <div class="buttons">
                                                    <Button theme="is-inverted" text="← Précédent" onclick={prevStep} />
                                                    <Button text="Suivant →"  />
                                                </div>
                                            </div>
                                        </div>
                                        {/key}
                                    </form>
                                </div>
                                <div class="step {step === 5 ? '': 'is-hidden'}" transition:fade>
                                    <form method="POST" action="?/step5" use:enhance>
                                        {#key form}
                                        <div class="fieldset">
                                            <div class="field">
                                                <legend class="label">Qui finance votre formation ?</legend>
                                                <label class="label is-2" for="finance">Les frais de formation sont à la charge de :</label>
                                                <div class="control">
                                                    <div class="select">
                                                        <select
                                                            bind:value={finance}
                                                            name="finance"
                                                            id="finance"
                                                        >
                                                            <option value={1}>A ma charge</option>
                                                            <option value={2}>A la charge de mon employeur</option>
                                                            <option value={3}>Mixte</option>
                                                            <option value={4}>Sous réserve d'une prise en charge (employeur ou autre)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {#if Number(finance) === 2 || Number(finance) === 3 || Number(finance) === 4}
                                        <div class="fieldset">
                                            <div class="field">
                                                <legend class="label">À remplir si votre institution prend en charge vos frais</legend>
                                                <label class="label is-2" for="finance_payeur">Organisme payeur <span>(à remplir si les frais sont pris en charge par votre institution)</span></label>
                                                <div class="control">
                                                    <input
                                                        class="input"
                                                        type="text"
                                                        name="finance_payeur"
                                                        value="{form?.answer?.finance_payeur ?? form?.finance_payeur ?? ''}"
                                                    >
                                                </div>
                                                {#if form?.errors?.finance_payeur}
                                                <p class="has-text-danger mention">{form?.errors?.finance_payeur[0]}</p>
                                                {/if}
                                            </div>
                                            <div class="field">
                                                <label class="label is-2" for="finance_responsable">Responsable du service de formation</label>
                                                <div class="control">
                                                    <input
                                                        class="input"
                                                        type="text"
                                                        name="finance_responsable"
                                                        value="{form?.answer?.finance_responsable ?? form?.finance_responsable ?? ''}"
                                                    >
                                                </div>
                                                {#if form?.errors?.finance_responsable}
                                                <p class="has-text-danger mention">{form?.errors?.finance_responsable[0]}</p>
                                                {/if}
                                            </div>
                                            <div class="field">
                                                <label class="label is-2" for="finance_mail">Mail du responsable du service de formation</label>
                                                <div class="control">
                                                    <input
                                                        class="input"
                                                        type="text"
                                                        name="finance_mail"
                                                        value="{form?.answer?.finance_mail ?? form?.finance_mail ?? ''}"
                                                    >
                                                </div>
                                                {#if form?.errors?.finance_mail}
                                                <p class="has-text-danger mention">{form?.errors?.finance_mail[0]}</p>
                                                {/if}
                                            </div>
                                            <div class="field">
                                                <label class="label is-2" for="finance_adress">Adresse de l’institution</label>
                                                <div class="control">
                                                    <input
                                                        class="input"
                                                        type="text"
                                                        name="finance_address"
                                                        value="{form?.answer?.finance_address ?? form?.finance_address ?? ''}"
                                                    >
                                                </div>
                                                {#if form?.errors?.finance_adress}
                                                <p class="has-text-danger mention">{form?.errors?.finance_adress[0]}</p>
                                                {/if}
                                            </div>
                                        </div>
                                        {/if}
                                        <div class="columns is-vcentered">
                                            <div class="column is-narrow">
                                                <a href="/modules-courts/{data.slug}" class="link">Annuler</a>
                                            </div>
                                            <div class="column"></div>
                                            <div class="column is-narrow">
                                                <div class="buttons">
                                                    <Button theme="is-inverted" text="← Précédent" onclick={prevStep} />
                                                    <Button text="Envoyer" />
                                                </div>
                                            </div>
                                        </div>
                                        {/key}
                                    </form>
                                </div>

                                <div class="step {step === 6 ? '': 'is-hidden'}" transition:fade>
                                    <div class="fieldset has-text-centered">
                                        <div class="field">
                                            <picture>
                                                <img src="/images/pictos/check-circle.svg" alt="">
                                            </picture>
                                        </div>
                                        <div class="field">
                                            <p class="title is-2">Votre demande a bien été envoyée</p>
                                            <a href="/modules-courts" class="link">← Retour aux modules courts</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column infos">
                <div class="rows">
                    <div class="row">
                        <picture>
                            <img class="mea" src="{`${PUBLIC_HOST_API}/assets/${colloque.illustration_colloque}?width=400&height=300&format=webp`}" alt="">
                        </picture>
                    </div>
                    <div class="row">
                        <div class="box">
                            <p class="ref is-titre">{colloque.titre}</p>
                            <p class="ref">Date</p>
                            <p>du {colloque.date_debut} au {colloque.date_fin}</p>
                            <p class="ref">Lieu du rendez-vous</p>
                            <p>{colloque.lieu}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    @use '../../../../styles/variables.scss' as *;

    :global(.description p) {
        margin-bottom: 20px;
    }
    .infos {
        img.mea {
            display: block;
            border-radius: $gap;
            margin: 0 auto calc($gap * 2);
        }

        .box {
            background: $grey-light;
            box-shadow: none;
        }

        .ref {
            font-weight: bold;
            &:not(:first-child) {
                margin-top: calc($gap * 2);
            }

            &.is-titre {
                color: $tertiary;
                margin-bottom: calc($gap * 2);
            }
        }
    }

    .box {
        transition: all 0.3s ease;
    }

    .step {
        margin: calc($gap*2) 0;
        .total {
            width: 100%;
            background: $tertiary-light;
            height: 5px;
            position: relative;
        }
        .current {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: $tertiary;
            transition: all 1s ease;
        }
    }

    .label {
        &.is-2 {
            font-weight: normal;

            span {
                color: $grey;
            }
        }
    }

    form {
        text-align: left;

        input:not(.radio, .checkbox), select, .select {
            width: 100%;
        }
    }

    .fieldset {
        margin-bottom: calc($gap*2);
    }
    textarea {
        resize: none;
    }

    .ref {
        font-weight: bold;
        margin-top: calc($gap/2);
    }

    .title {
        &.is-1 {
            text-align: center;

            @media screen and (min-width: $b-desktop) {
                text-align: left;
            }
        }
    }

    .link {
        color: $tertiary;

        &:hover {
            text-decoration: underline;
        }
    }
</style>
